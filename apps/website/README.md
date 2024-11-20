# iTwinUI docs

[iTwinUI documentation website](https://itwinui.bentley.com).

## Threat Model

This repo uses Threagile to generate a threat model. To ensure that we keep our threat model up-to-date (both in terms of the architecture of our service and any potential threats) we will review the threat model under two different circumstances. Each review entails making sure the threat model continuously aligns with our service, captures known threats, and reflects the current status of any risk-tracking items.

During every PR, care should be taken to identify any potential architectural changes (e.g., a new endpoint/service dependency, significant new features, etc.) that would necessitate changes to the system model in threagile.yaml. It is both the developer's and reviewer's responsibility to ask, "what could go wrong?" resulting from direct changes or changes to prior security assumptions. Any new manual threats identified must be captured and tracked in threagile.yaml. Developers should use each PR as an opportunity to preemptively update threagile.yaml to expedite this process. No PRs will be approved or merged without including any required threagile.yaml changes.

A quarterly review of threagile.yaml. Each quarterly review will be tracked via a GitHub issue in this repo with the tag 'Threagile Review', and should be approved by the security champion and dev lead by typing 'APPROVED' in the issue once the review is complete. Threat model review consists of validating system model accuracy, identifying any new manual threats, and verifying up-to-date statuses on all risk tracking items.
