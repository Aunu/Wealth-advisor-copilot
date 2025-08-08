import { Component, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from 'src/app/services/data-service';
import { EmailPreviewComponent } from '../Preview-component/email-preview.component';
import { MeetingSchedulerComponent } from '../meeting-component/meeting-preview.component';

@Component({
    selector: 'app-notification-widget',
    templateUrl: './notification-widget.component.html',
    styleUrls: ['./notification-widget.component.css'],
    standalone: true,
    imports: [CommonModule, FormsModule, EmailPreviewComponent, MeetingSchedulerComponent]
})
export class NotificationWidgetComponent {
    constructor(private dataService: DataService) { }
    @Input() notifications: any[] = [];

    @ViewChild('preview') preview!: EmailPreviewComponent;
    @ViewChild('meetingPreview') meetingPreview!: MeetingSchedulerComponent;

    isVisible: boolean = true;
    actionInProgress: boolean = false;

    ignoreNotification(notification: any) {
        // Remove the notification from the list
        this.notifications = this.notifications.filter(n => n !== notification);
    }

    takeAction(notification: any) {
        notification.action = true
        this.actionInProgress = true;
        const task = {
            task_id: "",
            advisor_id: "ADV-00001",
            client_id: notification.client_id,
            task_category: "KYC",
            task_title: "",
            task_description: notification.notification,
            meeting_type: null,
            tags: ["kyc", "update"],
            notes: ""
        };

        this.dataService.generateEmailOfTask(task).subscribe(
            data => {
                const response = data.agent_response;
                const subjectMatch = response.match(/"subject"\s*:\s*"([^"]*)"/s);
                const bodyMatch = response.match(/"body"\s*:\s*"([\s\S]*?)"\s*,\n\s*"origin"/);
                const timeMatch = response.match(/"time"\s*:\s*"([^"]*)"/s);
                const dateMatch = response.match(/"date"\s*:\s*"([^"]*)"/s);
                const meetingDate = dateMatch ? dateMatch[1] : null;

                // Extract time

                const meetingTime = timeMatch ? timeMatch[1] : null;

                if (subjectMatch && bodyMatch) {
                    const subject = subjectMatch ? subjectMatch[1] : null;
                    const body = bodyMatch ? bodyMatch[1] : null;
                    this.preview.open(subject, body);
                    this.ignoreNotification(notification);
                    this.actionInProgress = false;
                } else if (meetingDate && meetingTime) {
                    this.meetingPreview.open(meetingDate, meetingTime, 'Zoom', 'Meeting');
                    this.ignoreNotification(notification);
                    this.actionInProgress = false;
                }  else {
                    this.ignoreNotification(notification);
                    this.actionInProgress = false;
                }
            }
        )
    }
}
