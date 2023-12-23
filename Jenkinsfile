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
                        docker.build("frontend:${env.BUILD_ID}").inside {
                            // Run tests or other build steps
                            // sh 'cd frontend'
                            // sh 'docker build --pull --rm -f "Dockerfile" .'
                        }
                        // Deploy or run the container
                        sh 'docker run --rm -d -p 8080:8080/tcp --name frontend'
                    }
                }
            }
        }
        stage('Build and Deploy Backend') {
            steps {
                dir('backend') {
                    script {
                        docker.build("backend:${env.BUILD_ID}").inside {
                            // 
                        }
                        // Deploy or run the container
                        sh 'docker run --rm -d -p 8080:8080/tcp --name backend'
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