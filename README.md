# testify-run-action

This action creates attestations for any command that is run. It is intended to be used in CI/CD pipelines to attest the results of the pipeline.

Note: This action and the supporting infrastructure is currently in alpha and is subject to change.  There are no guarantees of backwards compatibility data security or availability.

## Create a free account

To use this action, you must first create a free account at [https://judge.testifysec.io](https://judge.testifysec.io).

## Register a project

1.  Click Sources
2.  Select GitHub for NodeType
3.  Select a node group
4.  Use `Repo` for the selector key
5.  Enter your reposutory name for the selector value (i.e. https://github.com/testifysec/witness)
6.  Click Submit

## Inputs

Example usage
```yaml
on: [push]
permissions:
  id-token: write # This is required for requesting the JWT
  contents: read  # This is required for actions/checkout
jobs:
  test:
  
    runs-on: ubuntu-latest
    name: test testify run
    steps:
      - uses: testifysec/testify-run-action@main
        name: testify run command
        with:
          step-name: 'test'
          trace-enable: 'true'
          command: 'touch test.txt'
```
