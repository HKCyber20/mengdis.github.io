param(
  [string]$HostName = "152.32.215.175",
  [string]$SshUser = "ops",
  [int]$SshPort = 39482
)

$ErrorActionPreference = "Stop"

$release = Get-Date -Format "yyyyMMdd-HHmmss"
$archive = Join-Path $PSScriptRoot "blog-dist-$release.tgz"
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

  Invoke-Native "ssh" (@("-p", "$SshPort") + $sshOptions + @("$SshUser@$HostName", "mkdir -p ~/sites/blog/releases/$release"))
  Invoke-Native "scp" (@("-P", "$SshPort") + $sshOptions + @($archive, "$SshUser@$HostName`:~/sites/blog/releases/$release/dist.tgz"))
  Invoke-Native "ssh" (@("-p", "$SshPort") + $sshOptions + @("$SshUser@$HostName", "cd ~/sites/blog/releases/$release && tar -xzf dist.tgz && rm -f dist.tgz && cd ~/sites/blog && ln -sfn releases/$release current"))

  Write-Host "Published blog release: $release"
}
finally {
  if (Test-Path $archive) {
    Remove-Item -LiteralPath $archive -Force
  }
  Pop-Location
}
