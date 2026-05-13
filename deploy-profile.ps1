param(
  [string]$HostName = "152.32.215.175",
  [string]$SshUser = "ops",
  [int]$SshPort = 39482
)

$ErrorActionPreference = "Stop"

$release = Get-Date -Format "yyyyMMdd-HHmmss"
$archive = Join-Path $PSScriptRoot "profile-dist-$release.tgz"
$sshOptions = @("-o", "ServerAliveInterval=15", "-o", "ServerAliveCountMax=4")

function Invoke-Native {
  param(
    [string]$FilePath,
    [string[]]$ArgumentList
  )

  & $FilePath @ArgumentList
  if ($LASTEXITCODE -ne 0) {
    throw "$FilePath failed with exit code $LASTEXITCODE"
  }
}

Push-Location $PSScriptRoot
try {
  Invoke-Native "npm" @("run", "build")
  Invoke-Native "tar" @("-C", ".\dist", "-czf", $archive, ".")

  Invoke-Native "ssh" (@("-p", "$SshPort") + $sshOptions + @("$SshUser@$HostName", "mkdir -p ~/sites/profile/releases/$release"))
  Invoke-Native "scp" (@("-P", "$SshPort") + $sshOptions + @($archive, "$SshUser@$HostName`:~/sites/profile/releases/$release/dist.tgz"))
  Invoke-Native "ssh" (@("-p", "$SshPort") + $sshOptions + @("$SshUser@$HostName", "cd ~/sites/profile/releases/$release && tar -xzf dist.tgz && rm -f dist.tgz && cd ~/sites/profile && ln -sfn releases/$release current"))

  Write-Host "Published profile release: $release"
}
finally {
  if (Test-Path $archive) {
    Remove-Item -LiteralPath $archive -Force
  }
  Pop-Location
}
