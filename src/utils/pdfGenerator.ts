import jsPDF from 'jspdf';
import { ResumeData, TemplateType } from '../types/resume';

export const generatePDF = async (data: ResumeData, template: TemplateType, filename: string = 'resume.pdf') => {
  try {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);
    let currentY = margin;

    // Helper functions
    const addText = (text: string, x: number, y: number, options: any = {}) => {
      const fontSize = options.fontSize || 10;
      const fontStyle = options.fontStyle || 'normal';
      const align = options.align || 'left';
      
      pdf.setFontSize(fontSize);
      pdf.setFont('helvetica', fontStyle);
      
      if (align === 'center') {
        pdf.text(text, pageWidth / 2, y, { align: 'center' });
      } else {
        pdf.text(text, x, y);
      }
      
      return y + (fontSize * 0.5);
    };

    const addWrappedText = (text: string, x: number, y: number, maxWidth: number, fontSize: number = 10) => {
      pdf.setFontSize(fontSize);
      pdf.setFont('helvetica', 'normal');
      
      const lines = pdf.splitTextToSize(text, maxWidth);
      pdf.text(lines, x, y);
      
      return y + (lines.length * fontSize * 0.5);
    };

    const addSection = (title: string, y: number) => {
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text(title.toUpperCase(), margin, y);
      
      // Add underline
      pdf.setLineWidth(0.5);
      pdf.line(margin, y + 2, margin + 60, y + 2);
      
      return y + 10;
    };

    const checkPageBreak = (requiredSpace: number) => {
      if (currentY + requiredSpace > pageHeight - margin) {
        pdf.addPage();
        currentY = margin;
      }
    };

    // Header based on template
    if (template === 'modern') {
      // Modern template with blue header
      pdf.setFillColor(37, 99, 235); // Blue background
      pdf.rect(0, 0, pageWidth, 60, 'F');
      
      pdf.setTextColor(255, 255, 255); // White text
      currentY = addText(data.personalInfo.fullName || 'Your Name', margin, 25, { fontSize: 24, fontStyle: 'bold' });
      
      // Contact info in header
      const contactInfo = [];
      if (data.personalInfo.email) contactInfo.push(data.personalInfo.email);
      if (data.personalInfo.phone) contactInfo.push(data.personalInfo.phone);
      if (data.personalInfo.location) contactInfo.push(data.personalInfo.location);
      
      if (contactInfo.length > 0) {
        currentY = addText(contactInfo.join(' • '), margin, currentY + 5, { fontSize: 10 });
      }
      
      const webInfo = [];
      if (data.personalInfo.website) webInfo.push(data.personalInfo.website);
      if (data.personalInfo.linkedin) webInfo.push(data.personalInfo.linkedin);
      
      if (webInfo.length > 0) {
        currentY = addText(webInfo.join(' • '), margin, currentY + 5, { fontSize: 10 });
      }
      
      currentY = 70;
      pdf.setTextColor(0, 0, 0); // Reset to black
    } else {
      // Classic/Minimal template with simple header
      pdf.setTextColor(0, 0, 0);
      currentY = addText(data.personalInfo.fullName || 'Your Name', pageWidth / 2, 25, { fontSize: 20, fontStyle: 'bold', align: 'center' });
      
      const contactInfo = [];
      if (data.personalInfo.email) contactInfo.push(data.personalInfo.email);
      if (data.personalInfo.phone) contactInfo.push(data.personalInfo.phone);
      if (data.personalInfo.location) contactInfo.push(data.personalInfo.location);
      
      if (contactInfo.length > 0) {
        currentY = addText(contactInfo.join(' • '), pageWidth / 2, currentY + 5, { fontSize: 10, align: 'center' });
      }
      
      const webInfo = [];
      if (data.personalInfo.website) webInfo.push(data.personalInfo.website);
      if (data.personalInfo.linkedin) webInfo.push(data.personalInfo.linkedin);
      
      if (webInfo.length > 0) {
        currentY = addText(webInfo.join(' • '), pageWidth / 2, currentY + 5, { fontSize: 10, align: 'center' });
      }
      
      currentY += 10;
    }

    // Professional Summary
    if (data.personalInfo.summary) {
      checkPageBreak(30);
      currentY = addSection('Professional Summary', currentY);
      currentY = addWrappedText(data.personalInfo.summary, margin, currentY, contentWidth, 10);
      currentY += 10;
    }

    // Work Experience
    if (data.workExperience.length > 0) {
      checkPageBreak(40);
      currentY = addSection('Work Experience', currentY);
      
      data.workExperience.forEach((exp) => {
        checkPageBreak(35);
        
        // Position and Company
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text(exp.position, margin, currentY);
        currentY += 6;
        
        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'normal');
        pdf.text(`${exp.company} • ${exp.location}`, margin, currentY);
        
        // Date
        const dateText = `${formatDate(exp.startDate)} - ${exp.current ? 'Present' : formatDate(exp.endDate)}`;
        pdf.text(dateText, pageWidth - margin, currentY, { align: 'right' });
        currentY += 8;
        
        // Description
        exp.description.filter(desc => desc.trim()).forEach((desc) => {
          pdf.setFontSize(10);
          pdf.setFont('helvetica', 'normal');
          pdf.text('•', margin, currentY);
          currentY = addWrappedText(desc, margin + 5, currentY, contentWidth - 5, 10);
          currentY += 2;
        });
        
        currentY += 5;
      });
    }

    // Education
    if (data.education.length > 0) {
      checkPageBreak(30);
      currentY = addSection('Education', currentY);
      
      data.education.forEach((edu) => {
        checkPageBreak(20);
        
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text(`${edu.degree} in ${edu.field}`, margin, currentY);
        currentY += 6;
        
        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'normal');
        pdf.text(`${edu.institution} • ${edu.location}`, margin, currentY);
        
        const dateText = `${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}`;
        pdf.text(dateText, pageWidth - margin, currentY, { align: 'right' });
        currentY += 6;
        
        if (edu.gpa) {
          pdf.setFontSize(10);
          pdf.text(`GPA: ${edu.gpa}`, margin, currentY);
          currentY += 6;
        }
        
        currentY += 5;
      });
    }

    // Skills
    if (data.skills.length > 0) {
      checkPageBreak(30);
      currentY = addSection('Skills', currentY);
      
      const skillsByCategory = data.skills.reduce((acc, skill) => {
        if (!acc[skill.category]) acc[skill.category] = [];
        acc[skill.category].push(skill);
        return acc;
      }, {} as Record<string, typeof data.skills>);
      
      Object.entries(skillsByCategory).forEach(([category, skills]) => {
        checkPageBreak(15);
        
        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'bold');
        pdf.text(`${category}:`, margin, currentY);
        currentY += 6;
        
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        const skillNames = skills.map(skill => skill.name).join(', ');
        currentY = addWrappedText(skillNames, margin, currentY, contentWidth, 10);
        currentY += 8;
      });
    }

    // Helper function for date formatting
    function formatDate(date: string) {
      if (!date) return '';
      const [year, month] = date.split('-');
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${monthNames[parseInt(month) - 1]} ${year}`;
    }

    pdf.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('There was an error generating the PDF. Please try again.');
  }
};