# Appolo's Circles

A circle placement game with a global high score board, built with React and AWS Amplify Gen 2.

## Backend

The backend is defined in `amplify/` using [AWS Amplify Gen 2](https://docs.amplify.aws/react/). It provisions an AppSync GraphQL API and DynamoDB tables for `HighScore` and `Game` models.

### Local development

To run the backend locally, you need AWS credentials with sufficient permissions, then:

```bash
npx ampx sandbox
```

This generates `src/amplify_outputs.json` which the frontend uses to connect to the API.

### CI/CD notes

- This project uses **npm** (`package-lock.json`). There is no `yarn.lock` — do not add one, as CDK will error if both lockfiles are present.
- `amplify/package.json` declares `"type": "module"` and is required for CDK/ESM to work correctly. Do not delete it.
- CDK must be bootstrapped once per AWS account/region before Gen 2 deploys work:
  ```bash
  npx cdk bootstrap aws://<account-id>/<region>
  ```
- `src/amplify_outputs.json` is generated at build time by `npx ampx pipeline-deploy` and is not committed to git.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
