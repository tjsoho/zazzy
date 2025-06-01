const fs = require("fs");
const path = require("path");

// Rules to validate
const rules = {
  maxComponentLines: 50,
  requiredSections: [
    "IMPORTS",
    "Hooks",
    "Functions",
    "Components",
    "RENDER",
    "EXPORTS",
    "NOTES",
  ],
  folderStructure: {
    components: "src/components",
    pages: "src/app",
    api: "src/app/api",
    styles: "src/styles",
    images: "src/images",
    fonts: "src/fonts",
  },
};

function validateFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split("\n");

  // Check line count
  if (lines.length > rules.maxComponentLines) {
    console.error(`❌ ${filePath} exceeds 50 lines (${lines.length} lines)`);
  }

  // Check required sections
  const missingSections = rules.requiredSections.filter(
    (section) =>
      !content.includes(
        `***************************************************************\n                 ${section}`
      )
  );

  if (missingSections.length > 0) {
    console.error(
      `❌ ${filePath} is missing required sections: ${missingSections.join(
        ", "
      )}`
    );
  }

  // Check file location
  const fileDir = path.dirname(filePath);
  const fileName = path.basename(filePath);

  if (
    fileName.endsWith(".tsx") &&
    !fileDir.includes(rules.folderStructure.components)
  ) {
    console.error(
      `❌ ${filePath} should be in ${rules.folderStructure.components}`
    );
  }
}

function validateProject() {
  // Validate components
  const componentsDir = path.join(
    process.cwd(),
    rules.folderStructure.components
  );
  if (fs.existsSync(componentsDir)) {
    fs.readdirSync(componentsDir).forEach((file) => {
      if (file.endsWith(".tsx")) {
        validateFile(path.join(componentsDir, file));
      }
    });
  }

  // Validate pages
  const pagesDir = path.join(process.cwd(), rules.folderStructure.pages);
  if (fs.existsSync(pagesDir)) {
    fs.readdirSync(pagesDir).forEach((file) => {
      if (file.endsWith(".tsx")) {
        validateFile(path.join(pagesDir, file));
      }
    });
  }
}

// Run validation
console.log("🔍 Validating project against coding rules...");
validateProject();
console.log("✅ Validation complete!");
