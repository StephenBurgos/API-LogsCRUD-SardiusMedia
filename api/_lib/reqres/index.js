/* eslint-disable no-console */
import ReqRes from 'serverless-req-res';
import AWS from 'aws-sdk';

ReqRes(
  'plugin',
  'api/logs',
  () =>
    new Promise((fulfill, reject) => {
      // If this plugin has run once before, don't run again
      if (process.env.AWS_SECRETS_LOADED === '1' || process.env.IS_OFFLINE) {
        fulfill();
      } else {
        // Create an AWS Secrets Manager client
        const client = new AWS.SecretsManager({
          endpoint: `https://secretsmanager.${
            process.env.region
          }.amazonaws.com`,
          region: process.env.region,
        });
        // This determines which secret to pull from AWS
        const SecretId = `${process.env.stage}/logs`;

        client.getSecretValue({ SecretId }, (err, data) => {
          if (err) {
            if (err.code === 'ResourceNotFoundException') {
              reject(Error(`The requested secret ${SecretId} was not found`));
            } else if (err.code === 'InvalidRequestException') {
              reject(Error(`The request was invalid due to: ${err.message}`));
            } else if (err.code === 'InvalidParameterException') {
              reject(Error(`The request had invalid params: ${err.message}`));
            } else {
              reject(Error(err));
            }
          } else if (data.SecretString) {
            try {
              // const binarySecretData = data.SecretBinary;
              const secret = JSON.parse(data.SecretString);
              const keys = Object.keys(secret);

              for (let i = 0; i < keys.length; i += 1) {
                process.env[keys[i]] = secret[keys[i]];
              }

              // Set a variable so we don't run this function again
              process.env.AWS_SECRETS_LOADED = '1';

              fulfill();
            } catch (error) {
              console.log(`Issue parsing the secret string: ${error}`);
              reject(Error(`Issue parsing the secret string: ${error}`));
            }
          } else {
            console.log('No secret string was found');
            reject(Error('No secret string was found'));
          }
        });
      }
    }),
);

module.exports = ReqRes;
