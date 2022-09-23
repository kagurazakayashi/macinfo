curl -L -x 127.0.0.1:23333 -o "IEEE MA-L Assignments.csv" "http://standards-oui.ieee.org/oui/oui.csv"
curl -L -x 127.0.0.1:23333 -o "IEEE MA-M Assignments.csv" "http://standards-oui.ieee.org/oui28/mam.csv"
curl -L -x 127.0.0.1:23333 -o "IEEE MA-S Assignments.csv" "http://standards-oui.ieee.org/oui36/oui36.csv"
curl -L -x 127.0.0.1:23333 -o "IEEE IAB Assignments.csv" "http://standards-oui.ieee.org/iab/iab.csv"
curl -L -x 127.0.0.1:23333 -o "IEEE CID Assignments.csv" "http://standards-oui.ieee.org/cid/cid.csv"
curl -L -x 127.0.0.1:23333 -o "IEEE EtherType Assignments.csv" "http://standards-oui.ieee.org/ethertype/eth.csv"
curl -L -x 127.0.0.1:23333 -o "IEEE Manufacturer ID Assignments.csv" "http://standards-oui.ieee.org/manid/manid.csv"
curl -L -x 127.0.0.1:23333 -o "IEEE Operator ID Assignments.csv" "http://standards-oui.ieee.org/bopid/opid.csv"
echo %date% %time% >time.txt