const core = require("@actions/core");
const exec = require("@actions/exec");
const childProcess = require("child_process");
const process = require("process");

async function run() {
  let attestors = core.getInput("attestors").split(" ");
  const traceEnable = core.getInput("trace-enable");
  const stepName = core.getInput("step-name");
  const command = core.getInput("command");

  let attestationArgs = "";

  try {
    const gitRepo = childProcess.execSync(
      "git rev-parse --is-inside-work-tree"
    );
    if (gitRepo === "true") {
      attestors = attestors.append("git");
    }
  } catch (error) {
    console.log("Not in a git repo");
  }

  for (let i = 0; i < attestors.length; i++) {
    attestationArgs += "--attestors " + attestors[i] + " ";
  }

  const binary = "scribe";
  const mainScript = `${__dirname}/${binary}`;

  const cmd = [
    mainScript,
    "--step-name",
    stepName,
    "--trace",
    traceEnable,
    attestationArgs,
    "--",
    command,
  ];
  cmdJoined = cmd.join(" ");
  core.info("Running command: " + cmdJoined);

  //change working directory to the root of the repo
  process.chdir(process.env.GITHUB_WORKSPACE);

  exec.exec(cmdJoined);

  core.info("Command succeeded: " + cmdJoined);

  return;
}

run();
