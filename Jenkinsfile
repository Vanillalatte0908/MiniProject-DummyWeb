pipeline {
  agent any

  environment {
    NODE_VERSION = '18'
    REPORT_DIR = 'reports'
  }

  stages {
    stage('Checkout') {
      steps {
        echo '📦 Checking out source code...'
        checkout scm
      }
    }

    stage('Setup Node.js') {
      steps {
        sh '''
          echo "🧰 Checking Node.js..."
          if ! command -v node > /dev/null; then
            echo "Installing Node.js ${NODE_VERSION}..."
            curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash -
            apt-get install -y nodejs
          fi
          node -v
          npm -v
        '''
      }
    }

    stage('Install Dependencies') {
      steps {
        sh '''
          echo "📦 Installing dependencies..."
          npm ci || npm install
        '''
      }
    }

    stage('Install Playwright Browsers') {
      steps {
        echo '🎭 Installing Playwright browsers...'
        sh 'npx playwright install --with-deps'
      }
    }

    stage('Run Cucumber BDD Tests') {
      steps {
        echo '🥒 Running Cucumber BDD test suite...'
        // Use npm test or direct cucumber-js
        sh '''
          mkdir -p ${REPORT_DIR}
          npx cucumber-js --format json:${REPORT_DIR}/cucumber-report.json || true
        '''
      }
    }

    stage('Generate Cucumber HTML Report') {
      steps {
        echo '📊 Generating Cucumber HTML report...'
        sh '''
          if [ -f ${REPORT_DIR}/cucumber-report.json ]; then
            node generate-report.js
          else
            echo "⚠️ cucumber-report.json not found, skipping report generation."
          fi
        '''
      }
    }
  }

  post {
    always {
      echo '📁 Archiving test reports...'

      // Archive all generated reports
      archiveArtifacts artifacts: 'reports/**', allowEmptyArchive: true

      // Publish Cucumber HTML Report (requires HTML Publisher plugin)
      publishHTML([
        allowMissing: true,
        alwaysLinkToLastBuild: true,
        keepAll: true,
        reportDir: 'reports',
        reportFiles: 'cucumber-report.html',
        reportName: 'Cucumber BDD Report'
      ])

      echo '🧹 Cleaning up workspace...'
      cleanWs()
    }
    success {
      echo '✅ BDD pipeline completed successfully!'
    }
    failure {
      echo '❌ Tests failed! Check Cucumber HTML report for details.'
    }
  }
}
