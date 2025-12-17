pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'develop',
                    url: 'https://github.com/ebissolo/smooth-scrollbar.git',
                    credentialsId: 'github-creds'
            }
        }

        stage('Build') {
            steps {
                echo 'Build in corso...'
            }
        }

        stage('Test') {
            steps {
                echo 'Test in corso...'
            }
        }
    }
}
