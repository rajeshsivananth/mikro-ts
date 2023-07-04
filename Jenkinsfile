pipeline {
    agent any
    stages {
        stage("Clean up") {
            steps {
                deleteDir()
            }
        }
        stage("Clone Repo") {
            steps {
                sh "git clone https://github.com/rajeshsivananth/mikro-ts.git"
            }
        }
        stage("Build") {
            steps {
                dir("mikro-ts") {
                    sh "npm install"
                }
            }
        }
    }
}