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
                        sh 'docker build --pull --rm -f "Dockerfile" -t backend:latest .'
                    }
                }
            }
        }
    }
    post {
        success {

            sh 'docker stop $(docker ps | grep "frontend:latest" | awk '{print $1}')'
            sh 'docker stop $(docker ps | grep "backend:latest" | awk '{print $1}')'

            sh 'docker run --rm -d -p 8080:8080/tcp backend:latest'
            sh 'docker run --rm -d -p 3000:3000/tcp frontend:latest'

        }
    }
}