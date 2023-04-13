import subprocess as s

result = s.run(['cd',' flask_project'],shell=True)
# s.run(['echo hello hi'],shell=True)
print(result)