param([switch]$dev)

$process = Get-Process -id $pid

echo "Dev 3 $dev"

if($dev){
    new "grunt watch" -side left -pos 1 -max 2
    new "node app.js" -side left -pos 2 -max 2

    setWindowPosition $process right
} else {
    new "node app.js" -side left -pos 1 -max 1
    setWindowPosition $process right
}