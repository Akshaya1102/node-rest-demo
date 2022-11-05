pipeline { 
	agent any
    environment { 

        registry = "akshayaganesan/node-rest-repo" 

        registryCredential = 'docker-hub-credentials' 

        dockerImage = '' 

    }

    agent any 

    stages { 

        stage('Cloning our Git') { 

            steps { 
			 script {

                git 'https://github.com/Akshaya1102/node-rest-demo' 
				}
            }

        } 

        stage('Building our image') { 
            steps { 

                script { 

                    dockerImage = docker.build registry + ":$BUILD_NUMBER" 

                }

            } 

        }

        stage('Deploy our image') { 

            steps { 

                script { 

                    docker.withRegistry( '', registryCredential ) { 

                       dockerImage.push() 

                    }

                } 
            }

        } 

    }

}
