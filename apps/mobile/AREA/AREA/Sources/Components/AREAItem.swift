//
//  AREACard.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 17/01/2026.
//

import Foundation

struct AREAItem: Identifiable {
	let id = UUID()
	let title: String
	let actionEventType: String
	let reactionEventType: String
	let isActive: Bool = true
}
