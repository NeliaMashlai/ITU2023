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
                        sh 'ls'
                    }
                }
            }
        }
        stage('Build and Deploy Backend') {
            steps {
                dir('backend') {
                    script {
                        // sh current dir 
                        sh 'ls'
                    }
                }
            }
        }
    }
    post {
        always {
            // Clean up
            sh 'docker rm -f backend || true'
            sh 'docker rm -f frontend || true'
        }
    }
}