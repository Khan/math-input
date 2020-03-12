#!/bin/bash
set -ex
echo "Committing and pushing if needed"
git status -uno

if [[ -z "${GITHUB_TOKEN}" ]]
then
    echo "No github token provided, bailing (assuming this is running locally)"
    exit 0
fi

if [[ -n $(git status -s -uno) ]]
then
    echo "Creating commit..."
    git config user.name "Khan Actions Bot"
    git config user.email "khan-actions-bot@khanacademy.org"
    git commit -am "Committing autofixes"

    ORIGIN=https://khan-actions-bot:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git

    echo "Pushing to repo..."
    git fetch $ORIGIN ${GITHUB_HEAD_REF}
    git merge FETCH_HEAD -m "Merging in remote"
    git push $ORIGIN HEAD:${GITHUB_HEAD_REF}
    # If there were changes, we want to exit w/ error, indicating that
    # this commit had issues.
    exit 1
else
    echo "Working tree clean. Nothing to commit."
    exit 0
fi
