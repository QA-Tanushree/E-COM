const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Paths to different directories
const versionFilePath = path.join(__dirname, 'version.json');
const reportDir = path.join(__dirname, 'cypress', 'reports'); // Directory for individual test files
const versionedDir = path.join(reportDir, 'versioned'); // Directory for versioned reports
const deploymentDir = path.join(reportDir, 'deployment'); // Directory for final test-report.html

// Ensure required directories exist
[versionedDir, deploymentDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

// Read and increment version
let versionData = JSON.parse(fs.readFileSync(versionFilePath, 'utf8'));
let currentVersion = versionData.version.split('.');

// Increment the minor version
currentVersion[2] = (parseInt(currentVersion[2]) || 0) + 1; // Patch increment
const newVersion = currentVersion.join('.');

// Save the incremented version back to version.json
versionData.version = newVersion;
fs.writeFileSync(versionFilePath, JSON.stringify(versionData, null, 2));
console.log(`Version updated to: ${newVersion}`);

// Generate the merged report
const mergedFilePath = path.join(reportDir, `merged-${newVersion}.json`);

exec(
  `npx mochawesome-merge ${reportDir}/*.json -o ${mergedFilePath} && npx mochawesome-report-generator ${mergedFilePath} --reportDir ${versionedDir} --overwrite --reportFilename report-${newVersion}`,
  (error, stdout, stderr) => {
    if (error) {
      console.error(`Error generating report: ${error.message}`);
      console.error(stderr);
      return;
    }

    console.log(`Reports merged and saved as: report-${newVersion}.html`);

    // Path to the newly generated report
    const newReportPath = path.join(versionedDir, `report-${newVersion}.html`);

    // Check if the new report exists
    if (fs.existsSync(newReportPath)) {
      console.log(`New report found at: ${newReportPath}`);

      // Copy to deployment directory as test-report.html
      const finalReportPath = path.join(deploymentDir, 'test-report.html');
      fs.copyFileSync(newReportPath, finalReportPath);
      console.log(`Final report saved at: ${finalReportPath}`);
    } else {
      console.error(`Report file not found: ${newReportPath}`);
    }

    // Delete the merged JSON file
    fs.unlink(mergedFilePath, (err) => {
      if (err) {
        console.error(`Error deleting merged JSON file: ${err.message}`);
      } else {
        console.log(`Merged JSON file deleted: ${mergedFilePath}`);
      }
    });

    // Delete individual test report files in the report directory
    fs.readdir(reportDir, (err, files) => {
      if (err) {
        console.error(`Error reading report directory: ${err.message}`);
        return;
      }

      files.forEach(file => {
        const filePath = path.join(reportDir, file);
        if (
          (file.endsWith('.json') || file.endsWith('.html')) &&
          !file.includes(`report-${newVersion}`) &&
          !file.startsWith('versioned')
        ) {
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error(`Error deleting file ${file}: ${err.message}`);
            } else {
              console.log(`Deleted individual test report file: ${file}`);
            }
          });
        }
      });
    });
  }
);
