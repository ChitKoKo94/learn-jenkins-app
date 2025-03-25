pipeline {
    agent any

    environment {
        REACT_APP_VERSION = "1.0.$BUILD_ID"
        AWS_DEFAULT_REGION = 'us-west-2'
        APP_IMAGE_NAME = 'my-jenkins-app'
        AWS_DOCKER_REGISTRY = '211125607599.dkr.ecr.us-west-2.amazonaws.com'
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
        stage('Build Application Image') {
            agent {
                docker {
                    image 'my-aws-cli'
                    reuseNode true
                    args "-u root -v /var/run/docker.sock:/var/run/docker.sock --entrypoint=''"
                }
            }
            steps {
                withCredentials([usernamePassword(credentialsId: 'my-aws', passwordVariable: 'AWS_SECRET_ACCESS_KEY', usernameVariable: 'AWS_ACCESS_KEY_ID')]) {
                    sh '''
                        docker build -t $AWS_DOCKER_REGISTRY/$APP_IMAGE_NAME:$REACT_APP_VERSION .
                        aws ecr get-login-password | docker login --username AWS --password-stdin $AWS_DOCKER_REGISTRY  
                        docker push $AWS_DOCKER_REGISTRY/$APP_IMAGE_NAME:$REACT_APP_VERSION
                    '''
                }
            }
        }
        stage('AWS Deploy') {
            agent {
                docker {
                    image 'my-aws-cli'
                    reuseNode true
                    args "--entrypoint=''"
                }
            }
            steps {
                withCredentials([usernamePassword(credentialsId: 'my-aws', passwordVariable: 'AWS_SECRET_ACCESS_KEY', usernameVariable: 'AWS_ACCESS_KEY_ID')]) {
                    sh '''
                        aws --version 
                        sed -i "s/#APP_VERSION#/$REACT_APP_VERSION/g" aws/task-definition-prod.json
                        LATEST_TD_REVISION=$(aws ecs register-task-definition --cli-input-json file://aws/task-definition-prod.json | jq '.taskDefinition.revision')
                        echo $LATEST_TD_REVISION
                        aws ecs update-service --cluster LearnJenkinsApp-CKK-Cluster-Prod --service LearnJenkinsApp-Service-Prod --task-definition LearnJenkinsApp-Task-Prod:$LATEST_TD_REVISION                
                        aws ecs wait services-stable --cluster LearnJenkinsApp-CKK-Cluster-Prod --services LearnJenkinsApp-Service-Prod
                    '''
                }
            }
        }
        stage('Post Deployment') {
            steps {
                sh '''
                    echo 'Deployment success.'
                '''
            }
        }
    }
}