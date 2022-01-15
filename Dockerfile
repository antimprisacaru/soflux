FROM lambci/lambda:build-nodejs12.x

ENV AWS_DEFAULT_REGION eu-central-1

COPY ./dist/apps/monolith/ .

RUN zip -9yr lambda.zip

CMD aws lambda update-function-code --function-name mylambda --zip-file fileb://lambda.zip
