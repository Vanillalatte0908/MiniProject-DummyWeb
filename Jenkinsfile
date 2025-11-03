pipeline {
  agent any

  environment {
    NODE_VERSION = '18'
    REPORTS_DIR = 'reports'
    PLAYWRIGHT_REPORT = 'playwright-report'
  }

  stages {
    stage('Checkout') {
      steps {
        echo '📥 Checking out source code...'
        checkout scm
      }
    }

    stage('Setup Node.js') {
      steps {
        echo '⚙️ Setting up Node.js environment...'
        sh '''
          if ! command -v node >/dev/null 2>&1; then
            echo "Installing Node.js ${NODE_VERSION}..."
            curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash -
            apt-get install -y nodejs
          else
            echo "Node.js already installed: $(node -v)"
          fi
          echo "NPM version: $(npm -v)"
        '''
      }
    }

    stage('Install Dependencies') {
      steps {
        echo '📦 Installing project dependencies...'
        sh '''
          npm ci || npm install
        '''
      }
    }

    stage('Install Playwright Browsers') {
      steps {
        echo '🧩 Installing Playwright browsers...'
        sh 'npx playwright install --with-deps'
      }
    }

    stage('Run Playwright Tests') {
      steps {
        echo '🎭 Running Playwright test suite...'
        // Adjust your Playwright command as needed
        sh 'npx playwright test --reporter=line'
      }
    }

    stage('Run Cucumber Tests') {
      steps {
        echo '🥒 Running Cucumber (BDD) tests...'
        // Generate JSON report; prevent pipeline from failing due to test errors
        sh 'npx cucumber-js --format json:reports/cucumber_report.json || true'
      }
    }

    stage('Generate Cucumber HTML Report') {
      steps {
        echo '🧾 Generating Cucumber HTML report...'
        sh '''
          if [ -f reports/cucumber_report.json ]; then
            echo "Generating Cucumber report..."
            node generate-report.js
          else
            echo "⚠️ No cucumber_report.json found — skipping report generation."
          fi
        '''
      }
    }

    stage('Generate Playwright Report') {
      steps {
        echo '📊 Generating Playwright HTML report...'
        sh 'npx playwright show-report || true'
      }
    }
  }

  post {
    always {
      echo '📦 Archiving test reports...'

      // Archive reports as Jenkins artifacts
      archiveArtifacts artifacts: "${PLAYWRIGHT_REPORT}/**", allowEmptyArchive: true
      archiveArtifacts artifacts: "${REPORTS_DIR}/**", allowEmptyArchive: true

      // Publish Playwright report
      publishHTML([
        allowMissing: true,
        alwaysLinkToLastBuild: true,
        keepAll: true,
        reportDir: "${PLAYWRIGHT_REPORT}",
        reportFiles: 'index.html',
        reportName: 'Playwright Test Report'
      ])

      // Publish Cucumber report
      publishHTML([
        allowMissing: true,
        alwaysLinkToLastBuild: true,
        keepAll: true,
        reportDir: "${REPORTS_DIR}/html",
        reportFiles: 'index.html',
        reportName: 'Cucumber Test Report'
      ])

      echo '✅ Test pipeline completed.'
    }
  }
}
