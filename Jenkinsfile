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

        stage('Install') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run bundle:main') {
            steps {
                sh 'npm run bundle:main'
            }
        }
    }
}
