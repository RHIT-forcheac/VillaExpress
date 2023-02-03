import json
import requests

us_state_to_abbrev = {
    "Alabama": "AL",
    "Alaska": "AK",
    "Arizona": "AZ",
    "Arkansas": "AR",
    "California": "CA",
    "Colorado": "CO",
    "Connecticut": "CT",
    "Delaware": "DE",
    "Florida": "FL",
    "Georgia": "GA",
    "Hawaii": "HI",
    "Idaho": "ID",
    "Illinois": "IL",
    "Indiana": "IN",
    "Iowa": "IA",
    "Kansas": "KS",
    "Kentucky": "KY",
    "Louisiana": "LA",
    "Maine": "ME",
    "Maryland": "MD",
    "Massachusetts": "MA",
    "Michigan": "MI",
    "Minnesota": "MN",
    "Mississippi": "MS",
    "Missouri": "MO",
    "Montana": "MT",
    "Nebraska": "NE",
    "Nevada": "NV",
    "New Hampshire": "NH",
    "New Jersey": "NJ",
    "New Mexico": "NM",
    "New York": "NY",
    "North Carolina": "NC",
    "North Dakota": "ND",
    "Ohio": "OH",
    "Oklahoma": "OK",
    "Oregon": "OR",
    "Pennsylvania": "PA",
    "Rhode Island": "RI",
    "South Carolina": "SC",
    "South Dakota": "SD",
    "Tennessee": "TN",
    "Texas": "TX",
    "Utah": "UT",
    "Vermont": "VT",
    "Virginia": "VA",
    "Washington": "WA",
    "West Virginia": "WV",
    "Wisconsin": "WI",
    "Wyoming": "WY",
    "District of Columbia": "DC",
    "American Samoa": "AS",
    "Guam": "GU",
    "Northern Mariana Islands": "MP",
    "Puerto Rico": "PR",
    "United States Minor Outlying Islands": "UM",
    "U.S. Virgin Islands": "VI",
}

f = open('FakeDataScripts/fakeClientData.json')
  
data = json.load(f)
  
for i in data:
    address = '%s, %s, %s, %s' %(i.get('Address'), i.get('City'), us_state_to_abbrev.get(i.get('State')), i.get('Zip'))
    active = int(i.get('Active'))
    pyClientsObj = {
        "FName": i.get('FName'),
        "LName": i.get('LName'),
        "DateOfBirth": i.get('DateOfBirth'),
        "PhoneNumber": i.get('PhoneNumber'),
        "Email": i.get('Email'), 
        "Address": address,
        "Active": active
    }
    print(pyClientsObj)
    response = requests.post('http://localhost:8090/api/client', json = pyClientsObj)
    if response.status_code == 200:
        print("sucessfully added the clients")
    else:
        print('error adding clients')

f.close()

