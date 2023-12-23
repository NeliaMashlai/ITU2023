pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build and Deploy Frontend') {
            steps {
                dir('frontend') {
                    script {
                        sh 'sudo docker build --pull --rm -f "Dockerfile" -t frontend:latest .'
                    }
                }
            }
        }
        stage('Build and Deploy Backend') {
            steps {
                dir('backend') {
                    script {
                        sh 'sudo docker build --pull --rm -f "Dockerfile" -t frontend:latest .'
                    }
                }
            }
        }
    }
    post {
        // if build succeeds, send notification to Slack
        success {

            sh 'sudo docker run --rm -d -p 8080:8080/tcp backend:latest'
            sh 'sudo docker run --rm -d -p 3000:3000/tcp frontend:latest'

            emailext (
                subject: "Build ${currentBuild.fullDisplayName} succeeded",
                body: "Build ${currentBuild.fullDisplayName} succeeded",
                recipientProviders: [[$class: 'DevelopersRecipientProvider']]
            )
        }
    }
}