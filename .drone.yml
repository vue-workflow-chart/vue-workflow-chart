pipeline:
  build:
    image: node:8
    commands:
      - yarn install
      - yarn build
  tests:
    image: node:8
    commands:
      - yarn install
      - yarn run lint
      - yarn run test:unit --coverage
  sonar:
    image: aosapps/drone-sonar-plugin
    commands:
      - echo $PWD
      - sonar-scanner -Dsonar.login=$${SONAR_LOGIN}
    secrets: [SONAR_LOGIN]
    when:
      event: [push, tag]
  publish:
    image: plugins/npm
    settings:
      username: $${NPM_USERNAME}
      password: $${NPM_PASSWORD}
      email: $${NPM_EMAIL}
    secrets: [NPM_USERNAME, NPM_PASSWORD, NPM_EMAIL]
    when:
      event: tag
