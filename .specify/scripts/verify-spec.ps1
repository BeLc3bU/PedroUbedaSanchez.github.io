param(
    [Parameter(Mandatory=$false)]
    [string]$FeatureFolder
)
$cliPath = Join-Path $PSScriptRoot "..\..\bin\cli.js"
& node $cliPath verify
