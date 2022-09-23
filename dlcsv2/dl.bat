curl -L -x 127.0.0.1:23333 -o "MAC Address Block Large (MA-L).csv" "http://standards-oui.ieee.org/oui/oui.csv"
curl -L -x 127.0.0.1:23333 -o "MAC Address Block Medium (MA-M).csv" "http://standards-oui.ieee.org/oui28/mam.csv"
curl -L -x 127.0.0.1:23333 -o "MAC Address Block Small (MA-S).csv" "http://standards-oui.ieee.org/oui36/oui36.csv"
curl -L -x 127.0.0.1:23333 -o "Company ID.csv" "http://standards-oui.ieee.org/cid/cid.csv"
curl -L -x 127.0.0.1:23333 -o "Ethertype.csv" "http://standards-oui.ieee.org/ethertype/eth.csv"
curl -L -x 127.0.0.1:23333 -o "ManufacturerID.csv" "http://standards-oui.ieee.org/manid/manid.csv"
curl -L -x 127.0.0.1:23333 -o "IEEE 802.16 Operator ID.csv" "http://standards-oui.ieee.org/bopid/opid.csv"
curl -L -x 127.0.0.1:23333 -o "IAB.csv" "http://standards-oui.ieee.org/iab/iab.csv"
echo %date% %time% >time.txt