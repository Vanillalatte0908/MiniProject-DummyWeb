pipeline {
  agent any

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Setup Node.js') {
      steps {
        sh '''
          echo "Checking Node.js version..."
          node -v || (curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && apt-get install -y nodejs)
          npm -v
        '''
      }
    }

    stage('Install Dependencies') {
      steps {
        sh '''
          echo "Installing project dependencies..."
          npm ci || npm install
        '''
      }
    }

    stage('Install Playwright Browsers') {
      steps {
        sh 'npx playwright install --with-deps'
      }
    }

    stage('Run WEB Test') {
      steps {
        echo 'Running Playwright test suite...'
        // 👇 Replace with your actual test command(s)
        sh 'npx playwright test --reporter=line'
      }
    }

    stage('Run Cucumber Tests') {
      steps {
        echo 'Running Cucumber tests...'
        // 👇 Replace with your actual Cucumber command and output path
        sh 'npx cucumber-js --format json:reports/cucumber-report.json || true'
      }
    }

    stage('Generate Cucumber HTML Report') {
      steps {
        echo 'Generating Cucumber HTML report...'
        sh '''
          if [ -f reports/cucumber-report.json ]; then
            node generate-report.js
          else
            echo "⚠️ No cucumber-report.json found, skipping report generation."
          fi
        '''
      }
    }

    stage('Generate Playwright Report') {
      steps {
        echo 'Generating Playwright HTML report...'
        sh 'npx playwright show-report || true'
      }
    }
  }

  post {
    always {
      echo 'Archiving reports...'
      // Archive both Playwright and Cucumber reports
      archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
      archiveArtifacts artifacts: 'reports/**', allowEmptyArchive: true

      // Publish HTML reports in Jenkins UI (requires HTML Publisher plugin)
      publishHTML([
        allowMissing: true,
        alwaysLinkToLastBuild: true,
        keepAll: true,
        reportDir: 'playwright-report',
        reportFiles: 'index.html',
        reportName: 'Playwright Test Report'
      ])

      publishHTML([
        allowMissing: true,
        alwaysLinkToLastBuild: true,
        keepAll: true,
        reportDir: 'reports',
        reportFiles: 'cucumber-report.html',
        reportName: 'Cucumber Test Report'
      ])
    }
  }
}
