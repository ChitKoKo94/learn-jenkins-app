pipeline {
    agent any

    environment {
        NETLIFY_SITE_ID = '1867e68c-fc5d-4f83-9e77-98517d021bae'
        NETLIFY_AUTH_TOKEN = credentials('netlify-token')
    }

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
        stage('Deploy Staging') {
            agent {
                docker {
                    image 'node:23-alpine'
                    reuseNode true
                }
            }
            steps {
                sh '''
                    npm install netlify-cli node-jq
                    node_modules/.bin/netlify --version
                    echo '$NETLIFY_SITE_ID'
                    node_modules/.bin/netlify status
                    node_modules/.bin/netlify deploy --dir=build --json > deploy-output.txt
                    node_modules/.bin/node-jq -r '.deploy_url' deploy-output.txt
                '''
            }
        }
        stage('Approval') {
            steps {
                timeout(time: 10, unit: 'SECONDS') {
                    input message: 'Do you wish to deploy to production?', ok: "Yes, I am sure!"
                }
                script{
                    env.APPROVAL_DATE = sh(script: 'date', returnStdout: true)
                }
            }
        }
        /*
            npm install netlify-cli
            node_modules/.bin/netlify --version
            echo '$NETLIFY_SITE_ID'
            node_modules/.bin/netlify status
        */
        stage('Deploy Prod') {
            agent {
                docker {
                    image 'node:23-alpine'
                    reuseNode true
                }
            }
            steps {
                sh '''
                    echo 'Test SCM Polling'
                    echo 'Approved at $env.APPROVAL_DATE'
                    node_modules/.bin/netlify deploy --dir=build --prod
                '''
            }
        }
        stage('Post Deployment') {
            agent {
                docker {
                    image 'node:23-alpine'
                    reuseNode true
                }
            }
            steps {
                sh '''
                    echo 'Testing / Post deployment action'
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