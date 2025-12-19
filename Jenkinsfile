pipeline {
    agent any
    environment {
        NODE_HOME = "/var/jenkins_home/node-v24.4.0-linux-arm64"
        PATH = "/var/jenkins_home/node-v24.4.0-linux-arm64/bin:${env.PATH}"
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'develop',
                    url: 'https://github.com/ebissolo/smooth-scrollbar.git',
                    credentialsId: 'github-creds'
            }
        }

        stage('Run npm nstall') {
            steps {
                sh '''
                  node -v
                  npm -v
                  npm install
                '''
            }
        }

        stage('Run bundle:main') {
            steps {
                sh 'npm run bundle:main'
            }
        }
    }
}
