pipeline {
    agent any 

    stages {
        stage('Build') {
            agent {
                docker {
                    image 'node:23-alpine'
                    reuseNode true
                }
            }
            steps {
                sh '''
                    ls -la
                    node --version
                    npm --version
                    npm ci
                    npm run build
                    ls -la
                '''
            }
        }
        stage('Test') {
            agent {
                docker {
                    image 'node:23-alpine'
                    reuseNode true
                }
            }
            steps {
                sh '''
                    echo 'Hello!'
                    test -f build/index.html
                    npm test
                '''
            }
        }
        /*
        does not work for some reason
        stage('E2E') {
            agent {
                docker {
                    image 'mcr.microsoft.com/playwright:v1.39.0-jammy'
                    reuseNode true
                }
            }
            steps {
                sh '''
                    npm install serve
                    node_modules/.bin/serve -s build &
                    sleep 10
                    npx playwright test
                '''
            }
        }
        */
        // test run something in parallel
        stage('Parallel') {
            parallel {
                stage('Test 1') {
                    steps {
                        echo 'Test 1'
                        
                    }
                }
                stage('Test 2') {
                    steps {
                        echo 'Test 2'
                        
                    }
                }
            }
        }
        stage('Deploy') {
            agent {
                docker {
                    image 'node:23-alpine'
                    reuseNode true
                }
            }
            steps {
                sh '''
                    npm install netlify-cli
                    node_modules/.bin/netlify --version
                '''
            }
        }
    }

    post {
        always {
            junit 'jest-results/junit.xml'
        }
    }
}