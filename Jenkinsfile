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
                subject: "Build success in Jenkins: ${currentBuild.fullDisplayName}",
                body: "Everything is fine with ${env.BUILD_URL}",
                recipientProviders: [[$class: 'DevelopersRecipientProvider']]
            )

        }

        failure {

            // send email
            
            emailext (
                subject: "Build failed in Jenkins: ${currentBuild.fullDisplayName}",
                body: "Something is wrong with ${env.BUILD_URL}",
                recipientProviders: [[$class: 'DevelopersRecipientProvider']]
            )

        }
    }

}