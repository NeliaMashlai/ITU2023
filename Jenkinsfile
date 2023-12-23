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
                        sh 'docker build --pull --rm -f "Dockerfile" -t frontend:latest .'
                    }
                }
            }
        }
        stage('Build and Deploy Backend') {
            steps {
                dir('backend') {
                    script {
                        sh 'docker build --pull --rm -f "Dockerfile" -t frontend:latest .'
                    }
                }
            }
        }
    }
    post {
        // if build fails, send notification to Slack
        failure {
            slackSend (color: '#FF0000', message: "Build failed for ${env.JOB_NAME} ${env.BUILD_NUMBER} More info at: ${env.BUILD_URL}")
        }

        // if build succeeds, send notification to Slack
        success {
            slackSend (color: '#00FF00', message: "Build succeeded for ${env.JOB_NAME} ${env.BUILD_NUMBER} More info at: ${env.BUILD_URL}")
            sh 'docker container stop frontend:latest'
            sh 'docker container rm frontend:latest'
            sh 'docker container stop backend:latest'
            sh 'docker container rm backend:latest'

            sh 'docker run --rm -d -p 8080:8080/tcp backend:latest'
            sh 'docker run --rm -d -p 3000:3000/tcp frontend:latest'
        }
    }
}