pipeline {
  environment {
    SERVER_CREDENTIALS = credentials('server-credentials') 
    registry = "ayildiz89/nodejsapi"
    registryCredential = 'server-credentials'
    dockerImage = ''
  }
  agent any
  stages {
    stage('Cloning Git') {
      steps {
        git 'https://github.com/Ayildiz89/nodejs.git'
      }
    }
    stage('Building image') {
      steps{
        script {
          dockerImage = docker.build registry + ":$BUILD_NUMBER"
        }
      }
    }
    stage('Deploy Image') {
      steps{
        withCredentials([
        usernamePassword(credentials: 'server-credentials', usernameVariable: USER, passwordVariable: PWD)
          ])
        {
        sh "some script ${USER} ${PWD}"
        }
        script {
          docker.withRegistry( '', registryCredential ) {
            dockerImage.push()
          }
        }
      }
    }
    stage('Remove Unused docker image') {
      steps{
        sh "docker rmi $registry:$BUILD_NUMBER"
      }
    }
  }
}
