import React from 'react';
import { Link } from 'react-router-dom';

const TermsAndConditions = () => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Card Container */}
        <div className="bg-white shadow-2xl rounded-xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-center">
            <h1 className="text-4xl font-bold text-white">Terms & Conditions</h1>
            <p className="mt-2 text-lg text-blue-100">
              Last updated: October 2023
            </p>
          </div>

          {/* Content Section */}
          <div className="p-8">
            {/* Introduction */}
            <div className="mb-12">
              <p className="text-gray-700 leading-relaxed">
                Welcome to our task management platform. By accessing or using our services, you agree to comply with and be bound by the following terms and conditions. Please read them carefully.
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-12">
              {/* Section 1 */}
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">1.</span> Acceptance of Terms
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  By using this platform, you confirm that you accept these terms and agree to abide by them. If you do not agree to these terms, you must not use our services.
                </p>
              </div>

              {/* Section 2 */}
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">2.</span> User Responsibilities
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  You are responsible for maintaining the confidentiality of your account and password. You agree to notify us immediately of any unauthorized access to or use of your account.
                </p>
              </div>

              {/* Section 3 */}
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">3.</span> Prohibited Activities
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  You must not use this platform for any unlawful purpose or in any way that could damage, disable, or impair the service. Prohibited activities include, but are not limited to:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 pl-5">
                  <li>Harassing or harming others.</li>
                  <li>Uploading malicious software or viruses.</li>
                  <li>Attempting to gain unauthorized access to our systems.</li>
                </ul>
              </div>

              {/* Section 4 */}
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">4.</span> Intellectual Property
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  All content on this platform, including text, graphics, logos, and software, is the property of the platform owner and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without prior written consent.
                </p>
              </div>

              {/* Section 5 */}
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">5.</span> Limitation of Liability
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  We are not liable for any indirect, incidental, or consequential damages arising from your use of this platform. Our total liability to you for any claims shall not exceed the amount you paid to use our services.
                </p>
              </div>

              {/* Section 6 */}
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">6.</span> Changes to Terms
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  We reserve the right to modify these terms at any time. Your continued use of the platform after changes are posted constitutes your acceptance of the revised terms.
                </p>
              </div>

              {/* Section 7 */}
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">7.</span> Governing Law
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  These terms are governed by and construed in accordance with the laws of [Your Country/Region]. Any disputes arising from these terms will be subject to the exclusive jurisdiction of the courts in [Your Country/Region].
                </p>
              </div>
            </div>

            {/* Contact Section */}
            <div className="mt-12 border-t border-gray-200 pt-8">
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about these terms, please contact us at{' '}
                <Link
                  to="/contact"
                  className="text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                >
                  support@taskmanagement.com
                </Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;