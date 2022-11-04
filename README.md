# testify-run-action

**Warning - this is experimental only.  This may leak secrets when tracing support is enabled.

This action creates attestations for any command that is run. It is intended to be used in CI/CD pipelines to attest the results of the pipeline.

Note: This action and the supporting infrastructure is currently in alpha and is subject to change.  There are no guarantees of backwards compatibility data security or availability.  There is no privacy of the attestations created by this action, currently the attestations are public.

## Create a free account

To use this action, you must first create a free account at [https://judge.testifysec.io](https://judge.testifysec.io).

## Register a project

1.  Click Sources
2.  Select GitHub for NodeType
3.  Select a node group
4.  Use `Repo` for the selector key
5.  Enter your repo name for the selector value (i.e. https://github.com/testifysec/witness)
6.  Click Submit

## Bootstrap workload idenitty

For now you need to use the CLI tool `testify` (at the root of this repo)

```./testify --register-bin testify --workload-name testify --node-group dev```

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
          attestors: 'github sbom' {defualt is 'github'}
          command: 'go build ./...'
```

## Search for attestations

You can search for attestations using Judge portal at [https://judge.testifysec.io](https://judge.testifysec.io).

- Query for the project name
`https://github.com/testifysec/witness`

- Query for the artifact hash
`sha256sum {pipeline artifact} ==> enter hash without the algorithm prefix in the search box`

- Get Releated Attestations
`Click on the backref button on the search page`
