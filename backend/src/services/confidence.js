/**
 * 🧠 PowerPulse Core Confidence Score Engine
 * ============================================================================
 * What this does (In Plain English):
 * ----------------------------------------------------------------------------
 * When people tap "Report Electricity OFF", how does the computer know if it's
 * real or a prank?
 * 
 * It acts like a detective collecting 4 clues:
 *  1. Report Volume Clue: How many total reports came in? (Up to 30 pts)
 *  2. Unique Neighbors Clue: Are they different people? (Up to 40 pts)
 *  3. Time Burst Clue: Did they report within minutes of each other? (Up to 20 pts)
 *  4. Trust Clue: Have these citizens told the truth before? (Up to 10 pts)
 *  - Penalties: Subtract points for spammers and rapid accidental duplicates!
 * 
 * Formula:
 * Score (0 to 100) = ReportFactor + UniqueUserFactor + TimeClusterFactor + ReliabilityFactor - Penalty
 * ============================================================================
 */

function calculateConfidenceScore(reports = [], penalties = { duplicateCount: 0, spamCount: 0 }) {
    if (!reports || reports.length === 0) {
        return {
            score: 0,
            classification: 'low',
            breakdown: {
                reportCount: 0,
                uniqueUsers: 0,
                reportFactor: 0,
                uniqueUserFactor: 0,
                timeClusterFactor: 0,
                reliabilityFactor: 0,
                penalty: 0
            }
        };
    }

    const validReports = reports.filter(r => r.type === 'OFF' && !r.is_duplicate && !r.is_spam);
    const reportCount = validReports.length;

    // 1. Report Factor: valid reports * 3 (Max 30)
    const reportFactor = Math.min(reportCount * 3, 30);

    // 2. Unique User Factor: unique users * 8 (Max 40)
    const uniqueUserIds = new Set(validReports.map(r => r.user_id));
    const uniqueUsers = uniqueUserIds.size;
    const uniqueUserFactor = Math.min(uniqueUsers * 8, 40);

    // 3. Time Clustering Factor (Max 20)
    let timeClusterFactor = 0;
    if (validReports.length > 1) {
        const timestamps = validReports.map(r => new Date(r.reported_at).getTime());
        const minTime = Math.min(...timestamps);
        const maxTime = Math.max(...timestamps);
        const spanMinutes = (maxTime - minTime) / (1000 * 60);

        if (spanMinutes <= 10) {
            timeClusterFactor = 20;
        } else if (spanMinutes <= 30) {
            timeClusterFactor = 10;
        }
    } else if (validReports.length === 1) {
        timeClusterFactor = 5; // Slight signal for single report
    }

    // 4. Reliability Factor (Max 10)
    let avgReliability = 0.50;
    if (validReports.length > 0) {
        const totalReliability = validReports.reduce((sum, r) => sum + (r.reliability_score || 0.50), 0);
        avgReliability = totalReliability / validReports.length;
    }
    const reliabilityFactor = Math.round(avgReliability * 10);

    // 5. Intelligent Byzantine Fault-Tolerant Penalty Calculation
    // Prevents "Neighborhood Denial of Service": a single malicious spammer
    // cannot poison or mute an entire neighborhood when legitimate neighbors report.
    const rawDuplicatePenalty = (penalties.duplicateCount || 0) * 3;
    const rawSpamPenalty = (penalties.spamCount || 0) * 5;
    const rawTotalPenalty = rawDuplicatePenalty + rawSpamPenalty;

    // Penalty Capping based on genuine community consensus:
    // - If 3+ unique legitimate neighbors report, community consensus overrides isolated spam (max penalty: 12 pts).
    // - If 2 unique neighbors report, max penalty: 18 pts.
    // - If only 1 user reports (potential isolated prank/spam), max penalty: 25 pts.
    const maxAllowedPenalty = uniqueUsers >= 3 ? 12 : (uniqueUsers >= 2 ? 18 : 25);
    const totalPenalty = Math.min(rawTotalPenalty, maxAllowedPenalty);

    // Total raw calculation
    const rawScore = reportFactor + uniqueUserFactor + timeClusterFactor + reliabilityFactor - totalPenalty;
    const finalScore = Math.max(0, Math.min(100, Math.round(rawScore)));

    // Classification mapping
    let classification = 'low';
    if (finalScore >= 90) {
        classification = 'confirmed';
    } else if (finalScore >= 70) {
        classification = 'probable';
    } else if (finalScore >= 40) {
        classification = 'possible';
    }

    return {
        score: finalScore,
        classification,
        breakdown: {
            reportCount,
            uniqueUsers,
            reportFactor,
            uniqueUserFactor,
            timeClusterFactor,
            reliabilityFactor,
            penalty: totalPenalty
        }
    };
}

module.exports = {
    calculateConfidenceScore
};
