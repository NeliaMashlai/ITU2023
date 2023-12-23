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
                        sh 'chmod +x ../scripts/get_db.sh'
                        sh '../scripts/get_db.sh'
                        sh 'docker build --pull --rm -f "Dockerfile" -t backend:latest .'
                    }
                }
            }
        }
    }
    post {
        success {

            sh 'chmod +x ./scripts/stops.sh'
            sh './scripts/stops.sh'

            sh 'docker run --rm -d -p 8080:8080/tcp backend:latest'
            sh 'docker run --rm -d -p 3000:3000/tcp frontend:latest'

            // send email
            emailext (
                subject: "Build Success",
                body: "Build Success",
                to: "forjant1@gmail.com",
            )

        }

        failure {

            // send email
            emailext (
                subject: "Build Failure",
                body: "Build Failure",
                to: "forjant1@gmai.com",
            )

    }
}