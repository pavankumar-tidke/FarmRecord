import subprocess, json


api_key = '2RZOlKwBrYqmb4U3yAPRDtCBCzZ_6wDYtAZxN8XCXZSk2Gwzk'

try:
    # Run the curl command
    command = f'curl -X GET -H "Authorization: Bearer {api_key}" -H "Ngrok-Version: 2" https://api.ngrok.com/endpoints'
    # command = f'curl -X GET -H "Authorization: Bearer 2RZOlKwBrYqmb4U3yAPRDtCBCzZ_6wDYtAZxN8XCXZSk2Gwzk" -H "Ngrok-Version: 2" https://api.ngrok.com/endpoints'

    output = subprocess.check_output(command, shell=True)

    # Extract the JSON response
    response = output.decode('utf-8')
    start_index = response.find('{')
    end_index = response.rfind('}')
    json_data = response[start_index:end_index+1]

    # Parse the JSON data
    data = json.loads(json_data)

    # Print the parsed JSON data 


    publicUrl = data['endpoints'][0]['public_url']  # 0.tcp.in.ngrok.io:12345 
    public_port = publicUrl[-5:]
    print(publicUrl[-5:])
    
except IndexError as e:
  print(f'Ngrok service down: {e}')
except Exception as e:
  print(f'Ngrok Exception: {e}')

# print('-'*50)
# print(data['endpoints'][0]['public_url'])
# print('-'*50)
# print('-'*50)

# print('-'*50)