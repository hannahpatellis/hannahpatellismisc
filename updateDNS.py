import urllib.request
import json
import requests

data = urllib.request.urlopen("http://ip.jsontest.com/").read().decode('utf-8')
data = json.loads(data)
ip = data["ip"]

url = "https://api.digitalocean.com/v2/domains/DOMAIN/records/RECORDNUMBER"
headers = {"Content-Type": "application/json", "Authorization": "Bearer APIKEY"}
data = '{"data": "'+ip+'"}'

r = requests.request('PUT', url, data=data, headers=headers)

