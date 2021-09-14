import { Octokit } from "octokit";

const octokit = new Octokit({ auth: process.env.PAT });

console.log(process.env.PAT);

const testOcto = async () => {
  const commits = await octokit.rest.repos.listCommits({
    owner: "Moop204",
    repo: "aus-legislation.git",
  });

  console.log(commits);
  // octokit.rest.git.createCommit({
  //   owner: "Moop204",
  //   repo: "https://github.com/Moop204/aus-legislation",
  //   message: "testing octokit",
  //   tree: "idk",
  //   author: { name: "Moop204", email: "z5162792@unsw.edu.au" },
  // });
};

testOcto();
