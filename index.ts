import { Octokit } from "octokit";

const octokit = new Octokit({ auth: process.env.PAT });

console.log(process.env.PAT);

const testOctoCommit = async () => {
  const owner = "Moop204";
  const repo = "aus-legislation";
  const branch = "heads/master";
  // Get existing commits
  const commits = await octokit.rest.repos.listCommits({
    owner,
    repo,
  });

  // Take latest one
  const latestCommit = commits.data[0];

  // Make tree
  const files = [
    {
      mode: "100644" as const,
      path: "src/test/a.txt",
      content: "its only nine",
    },
  ];

  const {
    data: { sha: treeSHA },
  } = await octokit.rest.git.createTree({
    owner,
    repo,
    tree: files,
    base_tree: latestCommit.sha,
  });
  const {
    data: { sha: newCommitSHA },
  } = await octokit.rest.git.createCommit({
    owner: "Moop204",
    repo,
    message: "testing octokit",
    tree: treeSHA,
    author: {
      name: process.env.NAME as string,
      email: process.env.EMAIL as string,
    },
    parents: [latestCommit.sha],
  });
  const response = await octokit.rest.git.updateRef({
    owner,
    repo,
    ref: branch,
    sha: newCommitSHA,
  });
  console.log(response);
};
