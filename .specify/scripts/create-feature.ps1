param(
    [Parameter(Mandatory=$false)]
    [string]$FeatureId,

    [Parameter(Mandatory=$true)]
    [string]$FeatureName
)
$cliPath = Join-Path $PSScriptRoot "..\..\bin\cli.js"
& node $cliPath create $FeatureName
