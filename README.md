# Anocca sequence viewer

A DNA and protein sequence viewer developed and maintained by [Anocca](https://www.anocca.com).


# See [documentation](https://anocca-ab.github.io/sequence-viewer/)

# Developer guide
## Setting up your git credentials
```bash
git config --local user.email '<Your GitHub username>@users.noreply.github.com'
```

## Required programs
pnpm

`curl -fsSL https://get.pnpm.io/install.sh | sh -`

rush

`npm install -g @microsoft/rush`

heft

`npm install -g @rushstack/heft`

api-extractor

`npm install -g @microsoft/api-documenter`



## Updating the packages and previewing result in the website
1. Go to the `website` folder.

2. Install dependencies: `yarn install`

3. Start the server: `yarn start`

4. Make updates in the packages

5. Build your changes `rush build -T @anocca/sequence-viewer-website`

6. See result in browser

## Updating the general docs
Go to the `website` folder.

Install dependencies: `yarn install`

Start the server: `yarn start`

Deploy the docs: `GIT_USER=<Your GitHub username> USE_SSH=true yarn deploy`

## Updating API docs
If you've updated the docstrings in the code run:

```bash
cd website && ./write-docs.sh
```

This requires api-extractor (`npm install -g @microsoft/api-documenter`)

## Update changelogs
```bash
rush change
```

## Bump versions
```bash
rush version --bump
```

## Publish npm packages

```bash
rush publish -p --include-all
```

## Useful vscode extension
The [vscode-monorepo-workspace](https://github.com/folke/vscode-monorepo-workspace) extension can make some of the tooling like prettier and eslint work better in vscode.


## Creating a PR
When you have made changes, please describe which issue it solves and how it has been tested

## Convert all files to LF
*⚠ will not work if there are spaces in the file names*
```bash
git ls-tree --full-tree -r --name-only HEAD | xargs dos2unix
```

We are using the following settings, which is automatically enforced by the `.gitattributes` file:
```bash
git config --local core.eol lf # all checked out files should have LF
git config --local core.autocrlf input # convert all added CRLF to LF when staging
```
