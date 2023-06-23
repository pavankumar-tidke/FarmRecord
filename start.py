import subprocess
import re
  
 
ngrok_process = subprocess.Popen(['ngrok', 'tcp', '8090'], stdout=subprocess.PIPE)


 
for line in ngrok_process.stdout:
    line = line.decode('utf-8').strip()
    # url_match = re.search(r'Forwarding\s+(https?://.*)', line)
    url_match = re.search(r'Forwarding\s+(tcp?://.*)', line)
    if url_match:
        tunnel_url = url_match.group(1)
        open('test.txt', "wb").write(tunnel_url)
        print('Ngrok tunnel URL:', tunnel_url)
        break



# api key - 2RZOlKwBrYqmb4U3yAPRDtCBCzZ_6wDYtAZxN8XCXZSk2Gwzk



