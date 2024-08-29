## MongoDB Atlas Database Setup [Reference](https://www.mongodb.com/developer/languages/javascript/getting-started-with-mongodb-and-mongoose/)

- MongoDB Atlas provides an easy way to host and manage your data in the cloud.

### Install home brew
- https://builtin.com/articles/install-homebrew

### Install Atlas CLI  [Reference](https://www.mongodb.com/docs/atlas/cli/current/install-atlas-cli/#std-label-install-atlas-cli)

- ```brew install mongodb-atlas```

### Create & setup New Atlas Account [Reference](https://www.mongodb.com/docs/atlas/cli/current/atlas-cli-getting-started/#std-label-atlas-cli-onboarding)

- ```atlas setup``` - This will take to login page of atlas
- Create a Project
- Create a cluster in that project
- After creating the cluster, it will provide new username and password

### Connecting to Atlas Database

- ```mongoose.connect("mongodb+srv://<username>:<password>@cluster0.eyhty.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")```


### Learn More about Atlas [Here](https://www.mongodb.com/docs/atlas/)