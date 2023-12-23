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
                        docker.build("my-frontend:${env.BUILD_ID}").inside {
                            // Run tests or other build steps
                            sh 'cd frontend'
                            sh 'docker build --pull --rm -f "Dockerfile" -t frontend:latest .'
                        }
                        // Deploy or run the container
                        sh 'docker run --rm -d -p 8080:8080/tcp backend:latest'
                    }
                }
            }
        }
        stage('Build and Deploy Backend') {
            steps {
                dir('backend') {
                    script {
                        docker.build("my-backend:${env.BUILD_ID}").inside {
                            // Run tests or other build steps
                            sh 'cd backend'
                            sh 'docker build --pull --rm -f "Dockerfile" -t backend:latest .'
                        }
                        // Deploy or run the container
                        sh 'docker run --rm -d -p 8080:8080/tcp backend:latest'
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