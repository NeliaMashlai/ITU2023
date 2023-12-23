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
                        // sh current dir 
                        sh 'docker build --pull --rm -f "Dockerfile" -t backend:latest .'
                    }
                }
            }
        }
        stage('Build and Deploy Backend') {
            steps {
                dir('backend') {
                    script {
                        // sh current dir 
                        sh 'docker build --pull --rm -f "Dockerfile" -t frontend:latest .'
                    }
                }
            }
        }
    }
    post {
        always {
            // Clean up
            sh 'docker rm -f backend:latest || true'
            sh 'docker rm -f frontend:latest || true'
        }
    }
}